# make sure you have https://github.com/dockcross/dockcross in some dir
# docker run --rm dockcross/linux-mips-lts > ./dockcross
# chmod +x ./dockcross
# create a hello world program: helloWorld.c
#   #include <stdio.h>
#   #include <stdlib.h>
#
#   int main(int argc, char *argv[])
#   {
#       printf("Hello World from dockercrossMips\n");
#       return EXIT_SUCCESS;
#   }

# compile program
# ./dockcross bash -c '$CC -mips3 ./helloWorld.c -o helloWorld'
# other options: https://gcc.gnu.org/onlinedocs/gcc-4.1.2/gcc/MIPS-Options.html

# run program
# ./dockcross bash -c '/usr/bin/qemu-mips helloWorld'

# ./dockcross bash for an interactive shell
# readelf -a helloWorld

