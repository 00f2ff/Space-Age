
import math
import sys

def requirements(constant, divisor):
	s = []
	for i in range(1,22):
		s.append(math.floor(constant**(1+(i-1)/divisor)))
	print s

requirements(float(sys.argv[1]), float(sys.argv[2]))