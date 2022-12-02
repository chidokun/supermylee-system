module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      link: String,
      title: String,
      thumbnail: String,
      time: String,
      summary: String,
      category: String,
      sub_category: String,
      full_article: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const News = mongoose.model("news", schema);
  return News;
};
