import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { stringify } from "querystring";

export default async function handle(req, res) {
  const { title, content } = JSON.parse(req.body);
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    // Not Signed in
    console.log("Not Signed in");
    res.status(401);
  }
  res.end();
}
