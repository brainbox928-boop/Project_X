const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', '..', 'courses.html'), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];

function createPage() {
  const elements = {};
  for (const id of ['serviceId', 'serviceName', 'fullName', 'email', 'whatsapp', 'requirements', 'orderModal', 'orderFormElement']) {
    elements[id] = { value: '', classList: { add() {}, remove() {} }, focus() {} };
  }
  elements.orderFormElement.reset = () => {
    for (const id of ['serviceId', 'serviceName', 'fullName', 'email', 'whatsapp', 'requirements']) {
      elements[id].value = '';
    }
  };
  const values = new Map();
  const alerts = [];
  const context = {
    document: { getElementById: id => elements[id], addEventListener() {} },
    localStorage: {
      getItem: key => values.get(key) || null,
      setItem: (key, value) => values.set(key, value)
    },
    window: { location: { href: '' } },
    alert: message => alerts.push(message),
    confirm: () => true,
    console
  };
  vm.createContext(context);
  vm.runInContext(script, context);
  return { context, elements, values, alerts };
}

function fillForm(page) {
  Object.assign(page.elements.fullName, { value: 'Ada Example' });
  Object.assign(page.elements.email, { value: 'ada@example.test' });
  Object.assign(page.elements.whatsapp, { value: '+2348012345678' });
  Object.assign(page.elements.requirements, { value: 'Learn JavaScript' });
}

test('all course cards send their displayed course and price to checkout', () => {
  const cards = [...html.matchAll(/<div class="service-card" onclick="openOrderForm\((\d+)\)">[\s\S]*?<div class="service-name">([^<]+)<\/div>[\s\S]*?<div class="service-price">([^<]+)<\/div>/g)];
  assert.equal(cards.length, 30);
  for (const [, id, name, displayedPrice] of cards) {
    const page = createPage();
    page.context.openOrderForm(Number(id));
    assert.equal(page.elements.serviceId.value, Number(id));
    fillForm(page);
    page.context.submitOrder({ preventDefault() {} });
    const [order] = JSON.parse(page.values.get('brainboxX-pending-order'));
    assert.equal(order.name, name);
    assert.equal(order.price, Number(displayedPrice.slice(1).replace(/,/g, '')));
    assert.equal(order.quantity, 1);
    assert.deepEqual(order.serviceDetails, {
      fullName: 'Ada Example', email: 'ada@example.test',
      phone: '+2348012345678', details: 'Learn JavaScript'
    });
    assert.equal(page.context.window.location.href, 'checkout.html');
    assert.equal(page.values.has('courseEnrollments'), false);
  }
});

test('preserves an existing pending order when replacement is declined', () => {
  const page = createPage();
  page.values.set('brainboxX-pending-order', 'existing');
  page.context.confirm = () => false;
  page.context.openOrderForm(1);
  fillForm(page);
  page.context.submitOrder({ preventDefault() {} });
  assert.equal(page.values.get('brainboxX-pending-order'), 'existing');
  assert.equal(page.context.window.location.href, '');
});

test('does not navigate on storage failure or invalid course', () => {
  const page = createPage();
  page.context.openOrderForm(1);
  fillForm(page);
  page.context.localStorage.setItem = () => { throw new Error('Storage unavailable'); };
  page.context.console = { error() {} };
  page.context.submitOrder({ preventDefault() {} });
  assert.match(page.alerts.pop(), /Checkout could not be started/);
  assert.equal(page.context.window.location.href, '');
  page.elements.serviceId.value = '999';
  page.context.submitOrder({ preventDefault() {} });
  assert.match(page.alerts.pop(), /course could not be found/i);
});
