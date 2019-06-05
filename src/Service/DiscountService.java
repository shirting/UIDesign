package Service;

import Entity.Discount;
import java.util.ArrayList;

public interface DiscountService {
    public ArrayList<Discount> GetRestaurantDiscount(String Chaptcha) throws Exception;
    public ArrayList<String> AddRestaurantDiscount(String FullPrice,String MinusPrice,String chaptcha,String StartTime,String EndTime)throws Exception;
    public ArrayList<Discount> CheckDiscount()throws Exception;
    public boolean SuccessDiscount(int fullprice,int minusprice,String chaptcha,int ID)throws Exception;
    public boolean FailDiscount(int fullprice,int minusprice,String chaptcha,int ID)throws Exception;
    public boolean DeleteDiscount(String chaptcha,int full,int minus)throws Exception;
}
