package ServiceImpl;

import Dao.MemberDao;
import Dao.RestaurantDao;
import DaoImpl.MemberDaoImpl;
import DaoImpl.RestaurantDaoImpl;
import Service.RegisterService;

public class RegisterServiceImpl implements RegisterService {
    RestaurantDao restaurantDao=new RestaurantDaoImpl();
    MemberDao memberDao=new MemberDaoImpl();
    @Override
    public String RestaurantRegister(String name, String phone, String address, String type) throws Exception {
        return restaurantDao.Register(name,phone,address,type);
    }

    @Override
    public String MemberRegister(String name, String phone, String password, String email, String address) throws Exception {

        return memberDao.Register(name,phone,password,email,address);
    }
}
