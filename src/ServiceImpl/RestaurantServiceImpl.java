package ServiceImpl;

import Dao.DishDao;
import Dao.RestaurantDao;
import DaoImpl.DishDaoImpl;
import DaoImpl.RestaurantDaoImpl;
import Entity.Dish;
import Entity.Restaurant;
import Service.RestaurantService;

import java.sql.SQLException;
import java.util.ArrayList;

public class RestaurantServiceImpl implements RestaurantService {
    RestaurantDao restaurantDao=new RestaurantDaoImpl();
    DishDao dishDao=new DishDaoImpl();
    @Override
    public Boolean ResFail(String name, String phone, String address, String type) throws Exception {
        return restaurantDao.ResFail(name,phone,address,type);
    }

    @Override
    public int GetUUID() throws Exception {
        return restaurantDao.GetUUID();
    }

    @Override
    public Boolean WriteUUID(String chaptcha, String name, String phone, String address, String type) throws Exception {
        return restaurantDao.WriteUUID(chaptcha, name, phone, address, type);
    }

    @Override
    public Boolean ResSuccess( String name, String phone, String address, String type) throws Exception {
        return restaurantDao.ResSuccess(name, phone, address, type);
    }

    @Override
    public Restaurant getRestaurantInfo(String name, String chaptcha) throws Exception {
        return restaurantDao.getRestaurantInfo(name, chaptcha);
    }

    @Override
    public String EditRestaurantInfo(String chaptcha,String name, String phone, String type, String address) throws Exception {
        return restaurantDao.EditRestaurantInfo(chaptcha,name,phone,type,address);
    }

    @Override
    public ArrayList<Dish> GetRestaurantDish(String Chaptcha) throws Exception {
        return dishDao.GetRestaurantDish(Chaptcha);
    }

    @Override
    public ArrayList<Restaurant> GetRestaurant(String type) throws SQLException {
        return restaurantDao.GetRestaurant(type);
    }

    @Override
    public String EditSuccess(String chaptcha) throws SQLException {
        return restaurantDao.EditSuccess(chaptcha);
    }

    @Override
    public String EditFail(String chaptcha) throws SQLException {
        return restaurantDao.EditFail(chaptcha);
    }

    @Override
    public ArrayList<Restaurant> GetRestaurantInfo() throws Exception {
        return restaurantDao.GetRestaurantInfo();
    }
}
