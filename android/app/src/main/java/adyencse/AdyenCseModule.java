package adyencse;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.Date;
import java.util.Map;

import javax.annotation.Nullable;

import adyen.com.adyencse.encrypter.exception.EncrypterException;
import adyen.com.adyencse.pojo.Card;

public class AdyenCseModule extends ReactContextBaseJavaModule{

    public AdyenCseModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AdyenCse";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    @ReactMethod
    public void generateCSE(
            String publicKey,
            String name,
            String number,
            String cvc,
            String expiryMonth,
            String expiryYear,
            Promise promise
    ) {

        try {
            Card card = new Card.Builder()
                    .setHolderName(name)
                    .setNumber(number)
                    .setCvc(cvc)
                    .setExpiryMonth(expiryMonth)
                    .setExpiryYear(expiryYear)
                    .setGenerationTime(new Date())
                    .build();

            WritableMap map = Arguments.createMap();
            map.putString("response", card.serialize(publicKey));

            promise.resolve(map);
        } catch (NullPointerException | IllegalStateException | ArrayIndexOutOfBoundsException e) {
            e.getClass().getSimpleName();
            promise.reject("0");
        } catch (EncrypterException e) {
            e.printStackTrace();
            promise.reject("0");
        }
    }

}
