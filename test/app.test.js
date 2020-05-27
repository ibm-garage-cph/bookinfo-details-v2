const request = require("supertest");
const axios = require("axios");
const { app } = require("../src/app");

jest.mock("axios");

const apiResponse = {
  data: {
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
  },
};

// describe("GET /", () => {
//   it("responds with hello world", (done) => {
//     request(app)
//       .get("/")
//       .expect("Content-Type", /json/)
//       .expect({ message: "Hello World!" })
//       .expect(200, done);
//   });
// });

describe("Google Book info API", () => {
  describe("Golden path", () => {
    it("should return 200 if everything works", (done) => {
      axios.get.mockResolvedValue(apiResponse);

      request(app).get("/details/9780486424613").expect(200, done);
    });

    it("should return 404 if no ISBN is given", (done) => {
      axios.get.mockResolvedValue(apiResponse);

      request(app).get("/details").expect(404, done);
    });

    it("should return json", (done) => {
      axios.get.mockResolvedValue(apiResponse);

      request(app)
        .get("/details/9780486424613")
        .expect("Content-Type", /json/, done);
    });

    it("should take in a ISBN", (done) => {
      axios.get.mockResolvedValue(apiResponse);

      request(app).get("/details/9780486424613").expect(200, done);
    });

    it("should contain totalItems", (done) => {
      axios.get.mockResolvedValue(apiResponse);

      request(app)
        .get("/details/9780486424613")
        .then((response) => {
          expect(response.body.year).toBe("2002-09-19");
          expect(response.body.author).toBe("William Shakespeare");
          expect(response.body.publisher).toBe("Courier Corporation");
          expect(response.body.language).toBe("en");
          expect(response.body.cover).toBe(
            "http://books.google.com/books/content?id=v9ooAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          );
          done();
        });
    });
  });

  describe("When the google api is down", () => {
    it("should return 500 error code", (done) => {
      axios.get.mockRejectedValue();

      request(app).get("/details/9780486424613").expect(500, done);
    });

    it("should give a good explanation of what happened", (done) => {
      axios.get.mockRejectedValue();

      request(app).get("/details/9780486424613").expect(
        {
          message:
            "We're sorry, we cannot get any information from Google Books",
        },
        done
      );
    });
  });
});
