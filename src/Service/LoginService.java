package Service;

import Entity.Member;
import Entity.Restaurant;
import Entity.Yummy;

public interface LoginService {

    public Member MemberLogin(String membername, String password) throws Exception;
    public String RestaurantLogin(String Restaurantname,String chaptcha) throws Exception;
    public Yummy YummyLogin(String Yummyname,String password) throws Exception;
}
