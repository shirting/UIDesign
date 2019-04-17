package Entity;
//店铺编码、满A减B
public class Discount {
    private String Chaptcha;
    private int Full;
    private int Minus;
    private String Result;

    public void setChaptcha(String chaptcha) {
        Chaptcha = chaptcha;
    }

    public void setFull(int full) {
        Full = full;
    }

    public void setMinus(int minus) {
        Minus = minus;
    }

    public void setResult(String result) {
        Result = result;
    }

    public String getResult() {
        return Result;
    }

    public int getMinus() {
        return Minus;
    }

    public int getFull() {
        return Full;
    }

    public String getChaptcha() {
        return Chaptcha;
    }
}
