import { parse } from "parse-multipart-data";
import { Readable } from "stream";
import { Buffer } from "buffer";
import {
  generateLoginUrl,
  generateLogoutUrl,
  getWindowCookie,
  getPaginatedChunk,
  addDays,
  generateRandomPassword,
  readStreamToEnd,
  parseForm,
  returnAwsCredentials,
} from "..";

// Mock the environment variables
process.env.COGNITOR_LOGIN_URL = "https://login.example.com/";
process.env.COGNITOR_LOGOUT_URL = "https://logout.example.com/";
process.env.AWS_ACCESS_KEY_ID = "testAccessKeyId";
process.env.AWS_SECRET_ACCESS_KEY = "testSecretAccessKey";

// Mock document.cookie for getWindowCookie tests
Object.defineProperty(document, "cookie", {
  writable: true,
  value: "testCookie=testValue",
});

describe("Utility Functions", () => {
  describe("generateLoginUrl", () => {
    it("should generate the correct login URL", () => {
      const url = generateLoginUrl("example.com", "/dashboard");
      expect(url).toBe("https://login.example.com/example.com/dashboard");
    });

    it("should handle empty origin and path", () => {
      const url = generateLoginUrl("", "");
      expect(url).toBe("https://login.example.com/");
    });
  });

  describe("generateLogoutUrl", () => {
    it("should generate the correct logout URL", () => {
      const url = generateLogoutUrl("example.com", "/logout");
      expect(url).toBe("https://logout.example.com/example.com/logout");
    });

    it("should handle empty origin and path", () => {
      const url = generateLogoutUrl("", "");
      expect(url).toBe("https://logout.example.com/");
    });
  });

  describe("getWindowCookie", () => {
    it("should return the correct cookie value", () => {
      const value = getWindowCookie("testCookie");
      expect(value).toBe("testValue");
    });

    it("should return null for non-existent cookie", () => {
      const value = getWindowCookie("nonExistentCookie");
      expect(value).toBeNull();
    });
  });

  describe("getPaginatedChunk", () => {
    const array = Array.from({ length: 100 }, (_, i) => i + 1);

    it("should return the correct chunk of data", () => {
      const chunk = getPaginatedChunk(array, 2);
      expect(chunk).toEqual(array.slice(20, 40));
    });

    it("should return an empty array for out of bounds page number", () => {
      const chunk = getPaginatedChunk(array, 100);
      expect(chunk).toEqual([]);
    });
  });

  describe("addDays", () => {
    it("should add 30 days to the given date", () => {
      const date = new Date("2023-01-01");
      const newDate = addDays(date);
      expect(newDate).toEqual(new Date("2023-01-31"));
    });

    it("should return Invalid Date for invalid date input", () => {
      const invalidDate = "invalid-date";
      const result = addDays(invalidDate);
      expect(result.toString()).toBe("Invalid Date");
    });
  });

  describe("generateRandomPassword", () => {
    it("should generate a password of the specified length", () => {
      const password = generateRandomPassword(10);
      expect(password).toHaveLength(10);
    });

    it("should generate a password with the default length", () => {
      const password = generateRandomPassword();
      expect(password).toHaveLength(6);
    });
  });

  describe("readStreamToEnd", () => {
    it("should throw an error when ReadableStream is not defined", async () => {
      const stream = Readable.from([Buffer.from([1, 2, 3])]);

      await expect(readStreamToEnd(stream)).rejects.toThrow(
        "stream.getReader is not a function"
      );
    });

    it("should read the stream to the end", async () => {
      const stream = {
        getReader: () => {
          let chunks = [new Uint8Array([1, 2, 3])];
          return {
            async read() {
              return chunks.length > 0
                ? { done: false, value: chunks.shift() }
                : { done: true, value: undefined };
            },
          };
        },
      };

      const result = await readStreamToEnd(stream as any);
      expect(result).toEqual(Buffer.from([1, 2, 3]));
    });

    it("should handle an empty stream", async () => {
      const stream = {
        getReader: () => {
          return {
            async read() {
              return { done: true, value: undefined };
            },
          };
        },
      };
      const result = await readStreamToEnd(stream);
      expect(result).toEqual(Buffer.from([]));
    });
  });

  describe('parseForm', () => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const body = Buffer.from(
      '--' + boundary + '\r\n' +
      'Content-Disposition: form-data; name="field1"\r\n\r\n' +
      'value1\r\n' +
      '--' + boundary + '--'
    );
  
    it('should parse form data correctly', () => {
      const contentType = `multipart/form-data; boundary=${boundary}`;
      const result = parseForm(body, contentType);
      expect(result.fields.field1).toBe('value1');
      expect(result.files).toHaveLength(0);
    });
  
    it('should handle missing boundary in content type', () => {
      const contentType = 'multipart/form-data;';
      expect(() => parseForm(body, contentType)).toThrowError('Missing boundary');
    });
  });

  describe("returnAwsCredentials", () => {
    it("should return the correct AWS credentials", () => {
      const creds = returnAwsCredentials();
      expect(creds).toEqual({
        accessKeyId: "testAccessKeyId",
        secretAccessKey: "testSecretAccessKey",
      });
    });

    it("should throw an error if environment variables are missing", () => {
      delete process.env.AWS_ACCESS_KEY_ID;
      delete process.env.AWS_SECRET_ACCESS_KEY;

      expect(() => returnAwsCredentials()).toThrow();
    });
  });
});
