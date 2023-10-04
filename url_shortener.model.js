import { Schema, model } from "mongoose";
import { z } from "zod";

const url_shortenerSchema = new Schema(
  {
    original_url: String,
    short_url: {
        type: Number,
        default: 0,
    },
  },
  { timestamps: true }
);

url_shortenerSchema.pre("save", async function (next) {
    const lastDoc = await Url_shortener.findOne().sort({ createdAt: -1})

    if (!lastDoc) {
        this.short_url = 1;
    } else {
        this.short_url = lastDoc.short_url + 1;
    }

    next()
});

export const Url_shortener = model("url_shortener", url_shortenerSchema);




export const url_shortenerValidate = z.object({
  original_url: z.string().url({ message: "invalid url" }),
});
