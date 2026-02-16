import java.util.HashMap;

class HashMapImpl {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("John", 25);
        map.put("Jane", 30);
        map.put("Jim", 35);
        System.out.println(map.get("John"));
        System.out.println(map.get("Jane"));
        System.out.println(map.get("Jim"));
    }
}