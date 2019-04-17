package Dao;

import Entity.Yummy;
import Entity.Restaurant;
import java.util.ArrayList;

public interface YummyDao {
    public Yummy isValidLogin(String Yummyname,String password) throws Exception;
    public ArrayList<Restaurant>  CheckRestaurant()throws Exception;
    public ArrayList<Restaurant> CheckEditBaseInfo()throws Exception;
}
