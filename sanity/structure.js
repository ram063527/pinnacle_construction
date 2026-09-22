// Keeps the Studio sidebar short and stops the client creating a second
// "Contact details" document.
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.divider(),
      S.listItem()
        .title("Contact details")
        .id("contactSettings")
        .child(
          S.document()
            .schemaType("contactSettings")
            .documentId("contactSettings")
            .title("Contact details")
        ),
    ]);
