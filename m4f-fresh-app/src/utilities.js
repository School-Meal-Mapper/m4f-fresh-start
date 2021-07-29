export function emailLink() {
    /* Create var to link to pre-filled email. subject is intentionally static - does not change by district. */
    var staticPortion = "mailto:?subject=Another Family Wants You to Join Meals4Families.org to Help Them Find Meals&body="
    staticPortion = encodeURI(staticPortion)
    /* assign body text to var (will be dynamic based on Sponsor, Sponsor email, Your Name input, and whether user is student/parent/guardian) */
    var body = "Dear [this sponsor], I am a [student or parent/guardian] in your area who is interested in finding meal sites near me. I ask that you consider contacting Meals 4 Families to join their site to make it easier for families in your area to find free meal sites. Best,[Your Name] "
    body = encodeURI(body)
    return staticPortion + body
}
