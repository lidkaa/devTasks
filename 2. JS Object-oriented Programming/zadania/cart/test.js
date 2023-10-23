class Test {
    static test = true;

    static init(data) {
        console.log('1', this)
        if (data.hasOwnProperty('test')) this.test = data.test;
        console.log('2', this)
    }
}

const data1 = {
    test: false
}

const data2 = {
    test: true
}

Test.init(data1)
Test.init(data2)