package ServiceImpl;

import Dao.DishDao;
import Dao.YummyDao;
import DaoImpl.DishDaoImpl;
import DaoImpl.YummyDaoImpl;
import Entity.Dish;
import Entity.Restaurant;
import Service.YummyService;

import java.util.ArrayList;

public class YummyServiceImpl implements YummyService {
    YummyDao yummyDao=new YummyDaoImpl();
    DishDao dishDao=new DishDaoImpl();
    @Override
    public ArrayList<Restaurant> CheckRestaurant() throws Exception {
        return yummyDao.CheckRestaurant();
    }

    @Override
    public ArrayList<Dish> CheckDish() throws Exception {
        return dishDao.CheckDish();
    }

    @Override
    public ArrayList<Restaurant> GetEditBaseInfo() throws Exception {
        return yummyDao.CheckEditBaseInfo();
    }
}
