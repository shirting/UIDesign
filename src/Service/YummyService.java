package Service;

import Entity.Restaurant;
import Entity.Dish;
import java.util.ArrayList;

public interface YummyService {
    public ArrayList<Restaurant> CheckRestaurant()throws Exception;
    public ArrayList<Dish> CheckDish()throws Exception;
    public ArrayList<Restaurant> GetEditBaseInfo()throws Exception;
}
