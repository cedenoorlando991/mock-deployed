export class mockingCSVData {
  public filepath: string;
  filemap: Map<string, string[][]>;

  constructor() {
    this.filepath = "";
    this.filemap = new Map();
    this.filemap.set("people.csv", [
      ["name", "age"],
      ["Abby", "18"],
      ["Tom", "24"]
    ]);

    this.filemap.set("week_plan.csv", [
      ["Day", "plan"],
      ["Monday", "study"],
      ["Tuesday", "swim"],
      ["Wednesday", "trip"]
    ]);

    this.filemap.set("empty.csv", []);

    this.filemap.set("one_column.csv", [["hello"], ["world"]]);
  }

  mockedLoad(file: string) {
    console.log(file);
    console.log(this.filemap.keys);
    if (this.filemap.has(file)) {
      this.filepath = file;
      console.log("printed correct:" + this.filepath);
      return [["status"], ["success"]];
    } else {
      return [["status"], ["error_bad_datasource"]];
    }
  }

  mockedView(file: string) {
    console.log(this.filepath);
    console.log(this.filemap.get(this.filepath));
    return this.filemap.get(file);
  }

  mockedSearch1(file: string, columnIndex: number, value: string) {
    const data = this.filemap.get(file);
    if (data) {
      return data.filter(
        (row, rowIndex) => rowIndex === 0 || row[columnIndex] === value
      );
    }
    return [];
  }
}
