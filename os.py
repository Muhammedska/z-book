import cv2
import numpy as np
import pyscreenshot as ImageGrab

def select_region():
    # Ekran görüntüsünü al
    img = ImageGrab.grab()

    # Ekran görüntüsünü OpenCV formatına dönüştür
    img_np = np.array(img)
    frame = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)

    # Pencere oluştur
    cv2.namedWindow("Ekran Görüntüsü")
    cv2.setMouseCallback("Ekran Görüntüsü", select_callback, frame)

    # Seçim işlemini başlat
    selected_rect = cv2.selectROI("Ekran Görüntüsü", frame, fromCenter=False, showCrosshair=True)

    # Seçilen bölgeyi kırp
    cropped = img.crop(selected_rect)

    # Ekran görüntüsünü kaydet
    cropped.save('screenshot.png')
    print("Ekran görüntüsü alındı: screenshot.png")

def select_callback(event, x, y, flags, param):
    global selected_rect, drawing

    if event == cv2.EVENT_LBUTTONDOWN:
        drawing = True
        selected_rect = (x, y, 0, 0)

    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        selected_rect = (selected_rect[0], selected_rect[1], x - selected_rect[0], y - selected_rect[1])
        cv2.rectangle(param, (selected_rect[0], selected_rect[1]), (x, y), (0, 255, 0), 2)
        cv2.imshow("Ekran Görüntüsü", param)

if __name__ == '__main__':
    select_region()
