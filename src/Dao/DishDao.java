package Dao;

import Entity.Dish;

import java.util.ArrayList;

public interface DishDao {
    public ArrayList<Dish> GetRestaurantDish(String Chaptcha)throws Exception;
    public ArrayList<Dish> CheckDish()throws Exception;
    public boolean SuccessDish(String ID)throws Exception;
    public boolean FailDish(String ID)throws Exception;
    public boolean DeleteDish(String chaptcha,String ID)throws Exception;
    public boolean AddDish(String Name,String DishInfo,String chaptcha,double DishPrice,int DishAmount,String StartTime,String EndTime)throws Exception;
}
