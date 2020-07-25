public class ApexMethods{

    @AuraEnabled
    public static List<Contact> getContacts(){
        return [select Name, Id from Contact];
    }
}