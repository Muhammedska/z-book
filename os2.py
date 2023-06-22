import win32api
import win32gui
import win32ui
import win32con
from ctypes import windll
from PIL import Image

def select_region():
    # Ekranın boyutlarını al
    width = win32api.GetSystemMetrics(win32con.SM_CXSCREEN)
    height = win32api.GetSystemMetrics(win32con.SM_CYSCREEN)

    # Ekranın anlık görüntüsünü al
    hwnd = win32gui.GetDesktopWindow()
    wDC = win32gui.GetWindowDC(hwnd)
    dcObj = win32ui.CreateDCFromHandle(wDC)
    cDC = dcObj.CreateCompatibleDC()
    dataBitMap = win32ui.CreateBitmap()
    dataBitMap.CreateCompatibleBitmap(dcObj, width, height)
    cDC.SelectObject(dataBitMap)
    cDC.BitBlt((0, 0), (width, height), dcObj, (0, 0), win32con.SRCCOPY)

    # Seçim işlemini başlat
    print("Bir bölge seçin...")
    rect = win32gui.GetClientRect(hwnd)
    start_x, start_y = win32gui.ClientToScreen(hwnd, (rect[0], rect[1]))
    end_x, end_y = start_x + rect[2], start_y + rect[3]

    # Seçim işlemi tamamlanana kadar devam et
    while True:
        x, y = win32gui.GetCursorPos()

        # Fare sol tuşuna basıldığında başlangıç noktasını kaydet
        if win32api.GetKeyState(win32con.VK_LBUTTON) < 0:
            start_x, start_y = x, y

        # Fare sol tuşu bırakıldığında bitiş noktasını kaydet
        if win32api.GetKeyState(win32con.VK_LBUTTON) >= 0:
            end_x, end_y = x, y
            if end_x == start_x and end_y == start_y:
                print(" - ")
            else:
                break

    # Seçilen bölgeyi dikdörtgen çerçeve ile işaretle
    dcObj.SelectObject(dataBitMap)
    dcObj.Rectangle((start_x, start_y, end_x, end_y))

    # Seçilen bölgenin anlık görüntüsünü al
    bmpinfo = dataBitMap.GetInfo()
    bmpstr = dataBitMap.GetBitmapBits(True)
    image = Image.frombuffer(
        'RGB',
        (bmpinfo['bmWidth'], bmpinfo['bmHeight']),
        bmpstr, 'raw', 'BGRX', 0, 1
    )

    # Ekran görüntüsünü kaydet
    image.save('screenshot.png')
    print("Ekran görüntüsü alındı: screenshot.png")

if __name__ == '__main__':
    select_region()
