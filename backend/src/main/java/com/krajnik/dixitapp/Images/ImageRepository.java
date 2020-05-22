package com.krajnik.dixitapp.Images;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Vector;

@Service
public class ImageRepository {
    private static List<Image> images = new ArrayList<>();
    public ImageRepository() {
        if(this.images.isEmpty()) {
        for(int i=0;i<243;i++) {
                images.add(new Image("/cards/card" + i + ".jpg"));
            }
        }
    }

    public Vector<Image> pickImages(int count){
        List<Integer> rand = new ArrayList<>();
        for(int i =0;i<images.size();i++)
            rand.add(i);
        Collections.shuffle(rand);
        Vector<Image> imagesToReturn = new Vector<>();
        for (int i =0;i<count;i++){
            imagesToReturn.add(images.get(rand.get(i)));
        }
        return imagesToReturn;
    }

    public List<Image> getImages() {
        return images;
    }

    public Image addImage(String name){
        Image image = new Image("/images/"+name);
        images.add(image);
        return image;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
