from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from binascii import hexlify, unhexlify


class EncryptionManager:
    block_size = 32
    iv = pad(b'temp_iv', 16)

    def __init__(self, key):
        self.key = pad(unhexlify(key), self.block_size)

    def __gen_aes_object(self):
        return AES.new(self.key, AES.MODE_CBC, self.iv)

    def encrypt(self, data):
        return hexlify(self.__gen_aes_object().encrypt(pad(data.encode(), self.block_size))).decode()

    def decrypt(self, data):
        try:
            return unpad(self.__gen_aes_object().decrypt(unhexlify(data.encode())), self.block_size).decode()
        finally:
            return ""

    def update_key(self, key):
        self.key = pad(unhexlify(key), self.block_size)


encryption_manager = EncryptionManager(hexlify(b'temp_key'))
