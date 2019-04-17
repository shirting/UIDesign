package Entity;

import java.sql.Date;
//店铺编码、菜名、价格、数量、具体信息、
public class Dish {
    private String Chaptcha;
    private String Dishname;
    private String DishInfo;
    private double DishPrice;
    private int DishAmount;
    private String DishesID;
    private String StartTime;
    private String EndTime;

    public String getChaptcha() {
        return Chaptcha;
    }

    public double getDishPrice() {
        return DishPrice;
    }

    public int getDishAmount() {
        return DishAmount;
    }

    public String getDishInfo() {
        return DishInfo;
    }

    public String getDishname() {
        return Dishname;
    }

    public String getDishesID() {
        return DishesID;
    }

    public String getEndTime() {
        return EndTime;
    }

    public String getStartTime() {
        return StartTime;
    }

    public void setDishAmount(int dishAmount) {
        DishAmount = dishAmount;
    }

    public void setDishInfo(String dishInfo) {
        DishInfo = dishInfo;
    }

    public void setDishname(String dishname) {
        Dishname = dishname;
    }

    public void setDishPrice(double dishPrice) {
        DishPrice = dishPrice;
    }

    public void setChaptcha(String chaptcha) {
        Chaptcha = chaptcha;
    }

    public void setEndTime(String endTime) {
        EndTime = endTime;
    }

    public void setStartTime(String startTime) {
        StartTime = startTime;
    }

    public void setDishesID(String dishesID) {
        DishesID = dishesID;
    }
}
