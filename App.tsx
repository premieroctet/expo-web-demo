import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  NativeBaseProvider,
  Text,
} from "native-base";
import useAsyncStorage from "./useAsyncStorage";
import { ApiResponse, getCryptosPrices } from "./api";

export default function App() {
  const [cryptos, setCryptos] = useAsyncStorage("cryptos", [
    "BTC",
    "ETC",
    "XRP",
  ]);
  const [prices, setPrices] = useState<ApiResponse>();
  const [addCryptoValue, setAddCryptoValue] = useState("");
  const removeCrypto = (toRemoveCrypto: string) =>
    setCryptos(cryptos.filter((crypto) => toRemoveCrypto !== crypto));
  const addCrypto = () => {
    setCryptos([...cryptos, addCryptoValue]);
    setAddCryptoValue("");
  };

  useEffect(() => {
    getCryptosPrices(cryptos).then(setPrices);
  }, [cryptos]);

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box w="80%" maxWidth="400px">
          <Heading color="emerald.400" m={4}>
            Crypto list
          </Heading>
          {cryptos.map((crypto) => {
            const data =
              prices && prices.DISPLAY[crypto]
                ? prices.DISPLAY[crypto].EUR
                : null;
            return (
              <Box
                key={crypto}
                flex={1}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                p={4}
              >
                {data && (
                  <Image
                    source={{
                      uri: `https://www.cryptocompare.com/${data.IMAGEURL}`,
                    }}
                    size="8"
                    alt={crypto}
                  />
                )}
                <Box flex={1} flexDirection="row" justifyContent="space-around">
                  <Text fontWeight="bold">{crypto}</Text>
                  {!data ? (
                    <ActivityIndicator />
                  ) : (
                    <Text
                      style={{
                        color: data.CHANGEPCT24HOUR > 0 ? "green" : "red",
                      }}
                    >
                      {data.CHANGEPCT24HOUR}%
                    </Text>
                  )}
                </Box>
                <IconButton
                  style={{ width: 50 }}
                  icon={<Icon name={"remove"} />}
                  onPress={() => removeCrypto(crypto)}
                />
              </Box>
            );
          })}
          <Input
            type="text"
            value={addCryptoValue}
            onChangeText={(text: any) => {
              console.log("event", text);
              setAddCryptoValue(text);
            }}
            InputRightElement={
              <Button onPress={addCrypto} type="submit">
                Add
              </Button>
            }
            placeholder="Add your own"
            mt={4}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
