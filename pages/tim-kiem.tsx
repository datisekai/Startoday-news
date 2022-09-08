import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  NativeSelect,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import SearchLayout from "../src/layouts/SearchLayout";
import WidthLayout from "../src/layouts/WidthLayout";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import categoryAPI from "../src/actions/category";
import DanhMucItem from "../src/models/DanhMucItem";
import { useRouter } from "next/router";
import Section4 from "../src/components/sections/Section4";
import TinTucItem from "../src/models/TinTucItem";
import SearchAPI from "../src/actions/search";
import FlexBox from "../src/components/FlexBox";
import SearchSkeleton from "../src/components/Skeleton/SearchSkeleton";

const Search = () => {
  const { data: dataCategory } = useQuery(
    [`danh-muc`],
    categoryAPI.getCategory
  );
  const router = useRouter();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { keywords, categoryId }: any = router.query;

  useEffect(() => {
    const searchData = async () => {
      if (keywords || categoryId) {
        const result: any = await SearchAPI.searchNews(
          {
            text: keywords,
            category: categoryId,
          },
          page,
          limit
        );
        setData(result);
      }
    };
    searchData();

    keywords && setText(keywords);
    categoryId && setCategory(categoryId);
  }, [keywords, categoryId, page]);

  const handleSearch = (text?: string, category?: string) => {
    let query = "";

    if (text && !category) {
      query = `/tim-kiem?keywords=${text}`;
      return router.push(query);
    }

    if (text && category) {
      query = `/tim-kiem?keywords=${text}&categoryId=${category}`;
      return router.push(query);
    }

    if (!text && category) {
      query = `/tim-kiem?category=${category}`;
      return router.push(query);
    }
  };

  return (
    <SearchLayout>
      <Box sx={{ bgcolor: "#f4f4f4", py: 2 }}>
        <WidthLayout>
          <TextField
            id='outlined-basic'
            size='medium'
            fullWidth
            placeholder='Tìm kiếm tin tức'
            value={text}
            onKeyUp={(e: any) => {
              if (e.keyCode === 13) {
                handleSearch(text);
              }
            }}
            onChange={(e: any) => setText(e.target.value)}
            sx={{
              input: {
                backgroundColor: "#fff",
              },
              div: {
                borderRadius: 0,
                bgcolor: "#fff",
              },
            }}
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id='demo-simple-select-filled-label'>
                      Theo mục
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-filled-label'
                      id='demo-simple-select-filled'
                      value={category}
                      onChange={(e: any) => {
                        setCategory(e.target.value);
                        handleSearch(text, e.target.value);
                      }}
                    >
                      <MenuItem sx={{ textTransform: "capitalize" }} value=''>
                        Tất cả
                      </MenuItem>
                      {dataCategory?.map((item: DanhMucItem) => (
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          key={item._id}
                          value={item._id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => handleSearch(text, category)}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </WidthLayout>
      </Box>

      <WidthLayout>
        <Box py={1} borderBottom={"1px dotted #ccc"}>
          <Stack direction={"row"} spacing={1}>
            <Typography fontWeight={"bold"}>Bộ lọc:</Typography>
            <Typography color='#666'>
              {data ? data.total : 0} kết quả
            </Typography>
          </Stack>
        </Box>
        <Box pt={1} pb={5}>
          {data ? (
            <Box>
              <Section4 data={data ? data.data : []} />
              <FlexBox mt={5} justifyContent='center'>
                <Pagination
                  color='secondary'
                  count={data ? Math.ceil(data.total / limit) : 0}
                  onChange={(e, page) => setPage(page)}
                  variant='outlined'
                  shape='rounded'
                />
              </FlexBox>
            </Box>
          ) : (
            [1, 2, 3, 4, 5].map((item: Number) => (
              <SearchSkeleton key={item.toString()} />
            ))
          )}
        </Box>
      </WidthLayout>
    </SearchLayout>
  );
};

export default Search;
