package ServiceImpl;

import Dao.DiscountDao;
import DaoImpl.DiscountDaoImpl;
import Entity.Discount;
import Service.DiscountService;

import java.util.ArrayList;

public class DiscountServiceImpl implements DiscountService {
    DiscountDao discountDao=new DiscountDaoImpl();
    @Override
    public ArrayList<Discount> GetRestaurantDiscount(String Chaptcha) throws Exception {
        return discountDao.GetRestaurantDiscount(Chaptcha);
    }

    @Override
    public ArrayList<String> AddRestaurantDiscount(String FullPrice, String MinusPrice,String chaptcha,String StartTime,String EndTime) throws Exception {
        return discountDao.AddRestaurantDiscount(FullPrice,MinusPrice,chaptcha,StartTime,EndTime);
    }

    @Override
    public ArrayList<Discount> CheckDiscount() throws Exception {
        return discountDao.CheckDiscount();
    }

    @Override
    public boolean SuccessDiscount(int fullprice, int minusprice, String chaptcha, int ID) throws Exception {
        return discountDao.SuccessDiscount(fullprice, minusprice, chaptcha, ID);
    }

    @Override
    public boolean FailDiscount(int fullprice, int minusprice, String chaptcha, int ID) throws Exception {
        return discountDao.FailDiscount(fullprice, minusprice, chaptcha, ID);
    }

    @Override
    public boolean DeleteDiscount(String chaptcha,int full, int minus) throws Exception {
        return discountDao.DeleteDiscount(chaptcha, full, minus);
    }

}
