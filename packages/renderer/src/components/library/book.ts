type BookAttributes = {
  name: String; //primary key
  path: String;
};

export class Book {
  properties: BookAttributes;

  constructor(bookProps: BookAttributes) {
    this.properties = bookProps;
  }
}
