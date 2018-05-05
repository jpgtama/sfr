<?php
$yujingSql = 'SELECT
d.track_id as  track_id,d.personnel_id as  personnel_id,d.lon as  lon,d.lat as  lat,d.grap_face as  grap_face,d.mac as  dmac,d.track_time as  track_time,d.point_id as  point_id,d.device_id as  device_id,d.data_id1 as  data_id1,d.data_id2 as  data_id2,d.addr as  addr,
b.name as name,  b.msisdn as msisdn,  b.mac as bmac,  b.imei as imei,  b.avator as avator,  b.ID_number as ID_number,  b.start_date as start_date,  b.end_date as end_date,  b.status as status,  b.faceId as faceId

FROM d_track_personnel d
inner join b_track_personnel b
on d.personnel_id  = b.personnel_id ';


 ?>
