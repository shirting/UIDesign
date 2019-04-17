package Service;

import Entity.Dish;
import Entity.Restaurant;

import java.sql.SQLException;
import java.util.ArrayList;

public interface RestaurantService {
    public Boolean ResFail(String name,String phone,String address,String type)throws Exception;
    public int GetUUID()throws Exception;
    public Boolean WriteUUID(String chaptcha,String name,String phone,String address,String type)throws Exception;
    public Boolean ResSuccess(String name,String phone,String address,String type)throws Exception;
    public Restaurant getRestaurantInfo(String name,String chaptcha)throws Exception;
    public String EditRestaurantInfo(String chaptcha,String name,String phone,String type,String address)throws Exception;
    public ArrayList<Dish> GetRestaurantDish(String Chaptcha)throws Exception;
    public ArrayList<Restaurant> GetRestaurant(String type) throws SQLException;
    public String EditSuccess(String chaptcha) throws SQLException;
    public String EditFail(String chaptcha) throws SQLException;
    //销售额前8的餐厅
    public ArrayList<Restaurant> GetRestaurantInfo()throws Exception;
}
