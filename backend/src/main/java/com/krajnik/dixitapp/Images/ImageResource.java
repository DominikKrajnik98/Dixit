package com.krajnik.dixitapp.Images;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Vector;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ImageResource {
    private final ImageRepository imageRepository;

    public ImageResource(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @GetMapping("/getImages")
    public List<Image> getImages(){
        return imageRepository.getImages();
    }

    @PostMapping("/addImage/{name}")
    public Image addImageToRepository(@PathVariable String name){
        return imageRepository.addImage(name);
    }
}
