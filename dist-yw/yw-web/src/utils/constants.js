export default {
    NAMESPACE:{
        LoginPage:"LoginPage",
        RolePage:"RolePage",
        OrganizationPage:"OrganizationPage",
        UserPage:"UserPage"
    },
    PAGESIZE:3,
    RESULT:{
        SUCCESS:1,
        FAIL:-1
    },
    HttpStatus:{
        OK:200
    },
    DEFAULT:-1,
    getKey(){
        return new Date().getTime();
    }
}