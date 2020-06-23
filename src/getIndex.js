class Index{ 
    constructor(len){
        this.len = len;
        this.index = 0;
    }
    prev(){
        return this.get(-1);
    }
    next(){
        return this.get(1);
    }
    get(val){
        this.index = (this.index + val + this.len) % this.len;
        return this.index;
    }
}
export default Index