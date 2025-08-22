/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/log'], function (runtime, log) {

  function sendJson(context, status, bodyObj) {
    context.response.setHeader({
      name: 'Content-Type',
      value: 'application/json; charset=utf-8'
    });
    // Optional but helpful
    context.response.setHeader({ name: 'Cache-Control', value: 'no-store' });
    context.response.setHeader({ name: 'X-Content-Type-Options', value: 'nosniff' });
    context.response.statusCode = status;
    context.response.write(JSON.stringify(bodyObj));
  }

  function parseJsonBody(context) {
    try {
      var raw = context.request.body || '';
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      throw new Error('Invalid JSON in request body: ' + e.message);
    }
  }

  function onRequest(context) {
    try {
      var method = (context.request.method || 'GET').toUpperCase();

      if (method === 'GET') {
        // 🔹 Example payload – adapt to your actual fields
        var currentUser = runtime.getCurrentUser();
        var payload = {
          // Basic user info
          name: currentUser.name || 'User',
          email: currentUser.email || '',
          // Bank account step
          paymentMethod: 'NEFT',
          primaryId: '000123456',
          receivingAccount: '987654321',
          secondaryRouting: '1122334455',
          secondaryAccount: '99887766',
          paymentPurpose: 'Refunds',
          // Documents step (you can return signed URLs or placeholders)
          w9: 'https://example.com/w9.pdf',
          check: 'https://example.com/check.png',
          doc1: 'https://example.com/doc1.pdf',
          doc2: 'https://example.com/doc2.pdf',
          // Billing address step
          vendorName: 'AddCore Software Corp',
          phone: '416-123-4567',
          address1: '123 Queen Street',
          address2: 'Suite 400',
          city: 'Toronto',
          zip: 'M5H 2N2',
          state: 'Ontario',
          country: 'Canada',
          // Bank address step
          bankName: 'Scotiabank',
          bankAddress1: '44 King Street West',
          bankCity: 'Toronto',
          bankState: 'Ontario',
          bankCountry: 'Canada',
          bankZip: 'M5H 1H1'
        };

        return sendJson(context, 200, payload);
      }

      if (method === 'POST') {
        var body = parseJsonBody(context);

        // 🔹 TODO: persist body to a record or do whatever you need
        // e.g., record.create({ type: 'customrecord_vendor_form', ... })

        // Echo back a success envelope
        return sendJson(context, 200, {
          ok: true,
          received: body
        });
      }

      // Optional: allow preflight if you ever open this externally
      if (method === 'OPTIONS') {
        context.response.setHeader({ name: 'Allow', value: 'GET, POST, OPTIONS' });
        return sendJson(context, 204, {});
      }

      return sendJson(context, 405, { error: 'Method Not Allowed' });

    } catch (e) {
      log.error('Suitelet Error', e);
      return sendJson(context, 500, { error: true, message: String(e) });
    }
  }

  return { onRequest: onRequest };
});
