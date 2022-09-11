import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER // e.g. us1
});

export default async function handler (req, res)  {
  const { email, city } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  var memberToAdd = {
    email_address: email,
    status: 'subscribed',
    ...(city) && {tags: [city]}
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, memberToAdd);

    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });  }
};