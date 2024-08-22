import mime from "mime-types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createOrUpdateDbEntry, createNewCognitorUser } from "src/app/actions";
import { parseForm, readStreamToEnd, returnAwsCredentials } from "src/utils";


const region = process.env.AWS_REGION || "us-east-1";
const s3Bucket = process.env.S3_BUCKET || "test-bucket";
const s3Client = new S3Client({ region, credentials: returnAwsCredentials() });

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
    });
  }

  try {
    const contentType = req.headers.get("content-type");
    const body = await readStreamToEnd(req.body);
    const { fields, files } = parseForm(body, contentType);
    const { title, email, createdAt, maxAllowedPictures, changePassword } =
      fields;

    if (!email || !title || isNaN(Number(maxAllowedPictures))) {
      return new Response("Invalid form data", {
        status: 400,
      });
    }

    // 1. Create a new or update Cognito user
    await createNewCognitorUser(email, changePassword);

    // 2. Save album data in DynamoDB
    await createOrUpdateDbEntry({
      email,
      title,
      maxAllowedPictures,
      createdAt,
    });

    const uploadPromises = files.map((file) => {
      const buffer = Buffer.from(new Uint8Array(file.buffer));
      const s3Params = {
        Bucket: s3Bucket,
        Key: `albums/${email}/${title}/preview/${file.name}`,
        Body: buffer,
        ContentType: file.type || mime.lookup(file.name),
        // Metadata: {
        //   "Content-Disposition": "attachment",
        // },
        Tagging: `expiration=${new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString()}`, // 30 days expiration
      };
      return s3Client.send(new PutObjectCommand(s3Params));
    });

    await Promise.all(uploadPromises);

    console.log(
      "User creation, album data saving, and file uploads completed successfully."
    );
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return new Response(JSON.stringify({ message: "Failure" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
