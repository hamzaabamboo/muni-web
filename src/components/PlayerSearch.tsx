import { Input } from "@chakra-ui/input";
import { Divider, ListItem, Stack, Text } from "@chakra-ui/layout";
import { Button, List } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { GraphContext } from "src/contexts/GraphContext";
import { GraphDisplayContext } from "src/contexts/GraphDisplayContext";

export const PlayerSearch = () => {
  const { points } = useContext(GraphContext);
  const { playerFilters, setPlayerFilters } = useContext(GraphDisplayContext);
  const [input, setInput] = useState<string>("");

  const handleAdd = () => {
    if (playerFilters.some((f) => f === input)) return;
    setInput("");
    setPlayerFilters((f) => [...f, input]);
  };

  const handleRemove = (txt: string) => {
    setPlayerFilters((f) => f.filter((f) => f !== txt));
  };
  return (
    <Stack>
      <Text>Search By Player Name (Click at it to remove)</Text>
      <Stack direction="row">
        <Input value={input} onChange={(v) => setInput(v.target.value)} />
        <Button colorScheme="blue" onClick={handleAdd}>
          Add
        </Button>
      </Stack>
      <List>
        {playerFilters.map((p) => (
          <ListItem key={p} px={2} onClick={() => handleRemove(p)}>
            {p}
            <Divider my={2} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
