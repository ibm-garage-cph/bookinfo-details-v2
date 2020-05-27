const apiResponse = {
  kind: "books#volumes",
  totalItems: 1,
  items: [
    {
      kind: "books#volume",
      id: "v9ooAwAAQBAJ",
      etag: "TxlnRxwgRdo",
      selfLink: "https://www.googleapis.com/books/v1/volumes/v9ooAwAAQBAJ",
      volumeInfo: {
        title: "The Comedy of Errors",
        authors: ["William Shakespeare"],
        publisher: "Courier Corporation",
        publishedDate: "2002-09-19",
        description:
          "Two sets of identical twins provide the basis for ongoing incidents of mistaken identity, within a lively plot of quarrels, arrests, and a grand courtroom denouement. One of Shakespeare's earliest comedic efforts.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9780486424613",
          },
          {
            type: "ISBN_10",
            identifier: "0486424618",
          },
        ],
        readingModes: {
          text: false,
          image: true,
        },
        pageCount: 53,
        printType: "BOOK",
        categories: ["Performing Arts"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: true,
        contentVersion: "1.1.1.0.preview.1",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false,
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=v9ooAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=v9ooAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        },
        language: "en",
        previewLink:
          "http://books.google.dk/books?id=v9ooAwAAQBAJ&printsec=frontcover&dq=isbn:0486424618&hl=&cd=1&source=gbs_api",
        infoLink:
          "http://books.google.dk/books?id=v9ooAwAAQBAJ&dq=isbn:0486424618&hl=&source=gbs_api",
        canonicalVolumeLink:
          "https://books.google.com/books/about/The_Comedy_of_Errors.html?hl=&id=v9ooAwAAQBAJ",
      },
      saleInfo: {
        country: "DK",
        saleability: "NOT_FOR_SALE",
        isEbook: false,
      },
      accessInfo: {
        country: "DK",
        viewability: "PARTIAL",
        embeddable: true,
        publicDomain: false,
        textToSpeechPermission: "ALLOWED",
        epub: {
          isAvailable: false,
        },
        pdf: {
          isAvailable: false,
        },
        webReaderLink:
          "http://play.google.com/books/reader?id=v9ooAwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
        accessViewStatus: "SAMPLE",
        quoteSharingAllowed: false,
      },
      searchInfo: {
        textSnippet:
          "Two sets of identical twins provide the basis for ongoing incidents of mistaken identity, within a lively plot of quarrels, arrests, and a grand courtroom denouement. One of Shakespeare&#39;s earliest comedic efforts.",
      },
    },
  ],
};

module.export = apiResponse;
