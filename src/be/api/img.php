<?php
// header("Content-type: image/jpg");
// $im = @imagecreate(100, 50)
//     or die("Cannot Initialize new GD image stream");
// $background_color = imagecolorallocate($im, 255, 255, 255);
// $text_color = imagecolorallocate($im, 233, 14, 91);
// imagestring($im, 1, 5, 5,  "A Simple Text String", $text_color);
// imagepng($im);
// imagedestroy($im);

/**
   * 生成某个范围内的随机时间
   * @param <type> $begintime  起始时间 格式为 Y-m-d H:i:s
   * @param <type> $endtime    结束时间 格式为 Y-m-d H:i:s
   * @param <type> $now         是否是时间戳 格式为 Boolean
   */
  function randomDate($begintime, $endtime="", $now = true) {
      $begin = strtotime($begintime);
      $end = $endtime == "" ? mktime() : strtotime($endtime);
      $timestamp = rand($begin, $end);
      // d($timestamp);
      return $now ? date("Y-m-d H:i:s", $timestamp) : $timestamp;
  }



$n = rand(1, 11);

$result= array('file_name'=> "D:/workspace/shuping-face-reg/testing-data/faces/$n.jpg", 'time'=> randomDate('2018-5-5 8:8:8', '2018-5-5 12:12:12'));

echo json_encode($result);
?>
