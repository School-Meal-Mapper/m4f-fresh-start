export function emailLink() {
  /* Create var to link to pre-filled email. subject is intentionally static - does not change by district. */
  const mailto = 'mailto:sponsor@email.com?subject=';
  var subject = 'Another Family Wants You to Join Meals4Families.org to Help Them Find Free Meals';
  subject = encodeURI(subject);
  subject += '&body=';
  /* assign body text to var (will be dynamic based on Sponsor, Sponsor email, Your Name input, and whether user is student/parent/guardian) */
  /* body text should be made to include personalized input, such as name, from SNF page form */
  var body =
    'Dear [this sponsor], \n \n I am a parent in your area who is interested in finding meal sites near me. I ask that you consider contacting Meals 4 Families to join their site to make it easier for families in your area to find free meal sites. \n \n Best, \n [YOUR NAME HERE]';
  body = encodeURI(body);
  return mailto + subject + body;
}
