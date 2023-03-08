class  Tueur {

  private nom :String ;
  private description :String;
  private lieu : String;
  private crime : String;
  private date :String;
  private WikiLink :String;

    constructor(nom:String,description :String, lieu:String,crime:String , date: String) {
      this.nom=nom;
      this.description=description;
      this.lieu=lieu;
      this.crime=crime;
      this.date=date;
      this.WikiLink="https://fr.wikipedia.org/wiki/"+nom;
    }

    public  getNom(): String{
      return this.nom;
    }

    public getDescription(): String {
      return this.description;
    }

    public getLieu():String {
      return this.lieu;
    }

    public getCrime():String{
      return this.crime;
    }

    public getDate():String{
      return this.date;
    }
  }