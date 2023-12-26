-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 26, 2023 at 09:26 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `muhapps_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `mapel_sekolah`
--

CREATE TABLE `mapel_sekolah` (
  `uid_mapel` int NOT NULL,
  `nama_mapel` varchar(50) NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mapel_sekolah`
--

INSERT INTO `mapel_sekolah` (`uid_mapel`, `nama_mapel`, `deskripsi`) VALUES
(1, 'Informatika', 'Mata Pelajaran yang mengajarkan tentang segala hal yang berhubungan dengan komputer'),
(2, 'Matematika', 'Mata Pelajaran yang berhubungan dengan angka ');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int NOT NULL,
  `nama_role` varchar(70) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `nama_role`, `description`) VALUES
(1, 'Super Admin', 'Sebuah role untuk mengakses semua data yang berhubungan dengan Aplikasi Ini'),
(2, 'Admin Sekolah', 'Sebuah role yang berhubungan dengan data sekolah masing - masing mulai dari pengisian data sekolah hingga ke data sekolah'),
(3, 'Guru', 'Sebuah role yang digunakan untuk apabila terdapat kesalahan pengisian pada guru masing masing sehingga guru bisa mengupdate sendiri data nya ');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah`
--

CREATE TABLE `sekolah` (
  `uid_sekolah` int NOT NULL,
  `uuid_sekolah` varchar(100) DEFAULT NULL,
  `npsn` varchar(15) NOT NULL,
  `nama_sekolah` varchar(70) NOT NULL,
  `akreditasi` varchar(5) NOT NULL,
  `jmlh_guru` int NOT NULL,
  `jmlh_tendik` int NOT NULL,
  `jmlh_ptk` int NOT NULL,
  `jmlh_pd` int NOT NULL,
  `alamat` text NOT NULL,
  `no_telp` varchar(18) DEFAULT NULL,
  `link_maps` text,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `uid_guru` int NOT NULL,
  `kd_sekolah` int NOT NULL,
  `kd_mapel` int NOT NULL,
  `nama_guru` varchar(70) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `jenis_kelamin` enum('Laki - Laki','Perempuan') NOT NULL,
  `golongan` varchar(50) NOT NULL,
  `pendidikan` varchar(50) NOT NULL,
  `agama` varchar(30) NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `alamat_guru` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `no_hp` varchar(18) NOT NULL,
  `email` varchar(70) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_akses`
--

CREATE TABLE `token_akses` (
  `id_akses` int NOT NULL,
  `uuid_user` varchar(100) NOT NULL,
  `generate_token` text NOT NULL,
  `ip_address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid_user` int NOT NULL,
  `uuid_user` varchar(100) NOT NULL,
  `kd_sekolah` int NOT NULL,
  `role_id` int NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `no_hp` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` int NOT NULL,
  `update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mapel_sekolah`
--
ALTER TABLE `mapel_sekolah`
  ADD PRIMARY KEY (`uid_mapel`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `sekolah`
--
ALTER TABLE `sekolah`
  ADD PRIMARY KEY (`uid_sekolah`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`uid_guru`);

--
-- Indexes for table `token_akses`
--
ALTER TABLE `token_akses`
  ADD PRIMARY KEY (`id_akses`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mapel_sekolah`
--
ALTER TABLE `mapel_sekolah`
  MODIFY `uid_mapel` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sekolah`
--
ALTER TABLE `sekolah`
  MODIFY `uid_sekolah` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `uid_guru` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_akses`
--
ALTER TABLE `token_akses`
  MODIFY `id_akses` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid_user` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
