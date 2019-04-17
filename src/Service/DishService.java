package Service;

import Entity.Dish;

import java.util.ArrayList;

public interface DishService {
    public ArrayList<Dish> GetRestaurantDish(String Chaptcha)throws Exception;
    public ArrayList<Dish> CheckDish()throws Exception;
    public boolean SuccessDish(int ID)throws Exception;
    public boolean FailDish(int ID)throws Exception;
    public boolean DeleteDish(String chaptcha,int ID)throws Exception;
    public boolean AddDish(String Name,String DishInfo,String chaptcha,double DishPrice,int DishAmount,String StartTime,String EndTime)throws Exception;

}
