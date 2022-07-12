class Apifeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword=this.queryStr.keyword?{
            title:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }
    pagination(resultPerPage){
        const currPage= Number(this.queryStr.page)||1;
        const skip = resultPerPage*(currPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports=Apifeatures;