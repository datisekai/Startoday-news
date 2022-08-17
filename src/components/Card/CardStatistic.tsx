import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface CardStatisticProps {
  title: string;
  label: string;
  image?: string;
}

const CardStatistic: React.FC<CardStatisticProps> = ({
  title,
  label,
  image,
}) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image={image || "https://source.unsplash.com/random"}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardStatistic;
