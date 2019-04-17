package ServiceImpl;

import Service.LoginService;
import Entity.Member;
import Entity.Restaurant;
import Entity.Yummy;
import Dao.RestaurantDao;
import Dao.MemberDao;
import Dao.YummyDao;
import DaoImpl.MemberDaoImpl;
import DaoImpl.RestaurantDaoImpl;
import DaoImpl.YummyDaoImpl;

public class LoginServiceImpl implements LoginService {
    MemberDao memberDao=new MemberDaoImpl();
    RestaurantDao restaurantDao=new RestaurantDaoImpl();
    YummyDao yummyDao=new YummyDaoImpl();

    @Override
    public Member MemberLogin(String membername,String password) throws Exception{
        return memberDao.isValidLogin(membername,password);
    }
    @Override


    public String RestaurantLogin(String Restaurantname,String chaptcha) throws Exception{
        return restaurantDao.isValidLogin(Restaurantname,chaptcha);
    }
    @Override
    public Yummy YummyLogin(String Yummyname,String password) throws Exception{
        return yummyDao.isValidLogin(Yummyname,password);
    }
}
