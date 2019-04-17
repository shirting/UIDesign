package Service;

public interface RegisterService {
    public String RestaurantRegister (String name,String phone,String address,String type) throws Exception;
    public String MemberRegister(String name,String phone,String password,String email,String address) throws Exception;
}
