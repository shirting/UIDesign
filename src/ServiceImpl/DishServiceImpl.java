package ServiceImpl;

import Dao.DishDao;
import DaoImpl.DishDaoImpl;
import Entity.Dish;
import Service.DishService;

import java.util.ArrayList;

public class DishServiceImpl implements DishService {
    DishDao dishDao=new DishDaoImpl();
    @Override
    public ArrayList<Dish> GetRestaurantDish(String Chaptcha) throws Exception {
        //System.out.println("Service:"+Chaptcha);
        return dishDao.GetRestaurantDish(Chaptcha);
    }

    @Override
    public ArrayList<Dish> CheckDish() throws Exception {
        return dishDao.CheckDish();
    }

    @Override
    public boolean SuccessDish(int ID) throws Exception {
        return false;
    }

    @Override
    public boolean FailDish(int ID) throws Exception {
        return false;
    }

    @Override
    public boolean DeleteDish(String chaptcha, int ID) throws Exception {
        return false;
    }

    @Override
    public boolean AddDish(String Name, String DishInfo, String chaptcha, double DishPrice, int DishAmount,String StartTime,String EndTime) throws Exception {
        return dishDao.AddDish(Name, DishInfo, chaptcha, DishPrice, DishAmount,StartTime,EndTime);
    }
}
